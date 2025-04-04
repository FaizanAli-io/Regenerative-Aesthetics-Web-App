import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { MoreThan, Repository } from 'typeorm';
import { UserSignUpDto } from './dto/user-signup.dto';
import { hash, compare } from 'bcrypt';
import { UserSignInDto } from './dto/user-signin.dto';
import { sign } from 'jsonwebtoken';
import { EmailsService } from 'src/emails/emails.service';
import * as crypto from 'crypto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private emailService: EmailsService,
  ) {}

  async signup(
    userSignUpDto: UserSignUpDto,
  ): Promise<UserEntity> {
    const userExists = await this.findUserByEmail(
      userSignUpDto.email,
    );
    if (userExists)
      throw new BadRequestException(
        'Email is not available.',
      );

    userSignUpDto.password = await hash(
      userSignUpDto.password,
      10,
    );

    const verificationToken = crypto
      .randomBytes(20)
      .toString('hex');
    const verificationTokenExpires = new Date(
      Date.now() + 24 * 60 * 60 * 1000,
    );

    let user = this.usersRepository.create({
      ...userSignUpDto,
      isVerified: true, //while in developement this is true, otherwise false.
      verificationToken,
      verificationTokenExpires,
    });

    user = await this.usersRepository.save(user);

    //IMP: email service is not yet complete so this is commented:

    // await this.emailService.sendVerificationEmail(
    //   user.email,
    //   verificationToken,
    // );
    delete (user as any).password;
    return user;
  }

  // async verifyEmailToken(
  //   token: string,
  // ): Promise<UserEntity> {
  //   const user =
  //     await this.usersRepository.findOne({
  //       where: {
  //         verificationToken: token,
  //         verificationTokenExpires: MoreThan(
  //           new Date(),
  //         ),
  //       },
  //     });

  //   if (!user)
  //     throw new BadRequestException(
  //       'Invalid or expired token.',
  //     );

  //   user.isVerified = true;
  //   return this.usersRepository.save(user);
  // }

  async signin(
    userSignInDto: UserSignInDto,
  ): Promise<UserEntity> {
    const userExists = await this.usersRepository
      .createQueryBuilder('users')
      .addSelect('users.password')
      .where('users.email=:email', {
        email: userSignInDto.email,
      })
      .getOne();
    if (!userExists)
      throw new BadRequestException(
        'Bad credentials.',
      );
    const matchPassword = await compare(
      userSignInDto.password,
      userExists.password,
    );
    if (!matchPassword)
      throw new BadRequestException(
        'Bad credentials.',
      );

    // if (!userExists.isVerified) {
    //   throw new BadRequestException(
    //     'Email not verified.',
    //   );
    // }

    delete (userExists as any).password;
    return userExists;
  }

  async accessToken(
    user: UserEntity,
  ): Promise<string> {
    return sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env
        .ACCESS_TOKEN_SECRET_KEY as string,
      {
        expiresIn: process.env
          .ACCESS_TOKEN_EXPIRE_TIME
          ? parseInt(
              process.env
                .ACCESS_TOKEN_EXPIRE_TIME,
              10,
            )
          : 3600,
      },
    );
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.usersRepository.find();
  }

  async findOne(id: number) {
    const user =
      await this.usersRepository.findOneBy({
        id,
      });

    if (!user)
      throw new NotFoundException(
        `User ${id} not found.`,
      );

    return user;
  }

  async update(
    id: number,
    fields: Partial<UpdateUserDto>,
  ) {
    const user = await this.findOne(id);

    if (fields.name)
      (await user).name = fields.name;

    if (fields.password)
      (await user).password = fields.password;

    return await this.usersRepository.save(user);
  }

  async findUserByEmail(email: string) {
    return await this.usersRepository.findOneBy({
      email,
    });
  }
}
