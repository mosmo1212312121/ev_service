import { hash } from 'bcrypt';
import DB from '@databases';
import { CreateUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { User } from '@interfaces/users.interface';
import { isEmpty } from '@utils/util';
import { UserType } from '@/interfaces/userType.interface';

class UserService {
  public users = DB.Users;
  public userType = DB.UserType;

  public async findAllUser(): Promise<User[]> {
    const allUser: User[] = await this.users.findAll({ include: [{ model: this.userType, as: 'user_type_data' }] });
    return allUser;
  }

  public async findAllRole(): Promise<UserType[]> {
    const allUserType: UserType[] = await this.userType.findAll();
    return allUserType;
  }

  public async createUser(userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

    const findUser: User = await this.users.findOne({ where: { phoneNumber: userData.phoneNumber } });
    if (findUser) throw new HttpException(409, `This number ${userData.phoneNumber} already exists`);

    // const hashedPassword = await hash(userData.password, 10);
    const createUserData: User = await this.users.create(userData);
    return createUserData;
  }

  public async findUserById(userId: number): Promise<User> {
    if (isEmpty(userId)) throw new HttpException(400, 'UserId is empty');

    const findUser: User = await this.users.findByPk(userId);
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    return findUser;
  }

  // public async createUser(userData: CreateUserDto): Promise<User> {
  //   if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

  //   const findUser: User = await this.users.findOne({ where: { email: userData.email } });
  //   if (findUser) throw new HttpException(409, `This email ${userData.email} already exists`);

  //   const hashedPassword = await hash(userData.password, 10);
  //   const createUserData: User = await this.users.create({ ...userData, password: hashedPassword });
  //   return createUserData;
  // }

  // public async updateUser(userId: number, userData: CreateUserDto): Promise<User> {
  //   if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

  //   const findUser: User = await this.users.findByPk(userId);
  //   if (!findUser) throw new HttpException(409, "User doesn't exist");

  //   const hashedPassword = await hash(userData.password, 10);
  //   await this.users.update({ ...userData, password: hashedPassword }, { where: { id: userId } });

  //   const updateUser: User = await this.users.findByPk(userId);
  //   return updateUser;
  // }
  public async updateUser(userId: number, userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

    const findUser: User = await this.users.findByPk(userId);
    if (!findUser) throw new HttpException(409, "User doesn't exist");
    await this.users.update(userData, { where: { id: userId } });

    const updateUser: User = await this.users.findByPk(userId);
    return updateUser;
  }

  public async deleteUser(userId: number): Promise<User> {
    if (isEmpty(userId)) throw new HttpException(400, "User doesn't existId");

    const findUser: User = await this.users.findByPk(userId);
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    await this.users.destroy({ where: { id: userId } });

    return findUser;
  }
}

export default UserService;
