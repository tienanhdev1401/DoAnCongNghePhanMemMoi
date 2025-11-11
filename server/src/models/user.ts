import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import USER_ROLE from "../enums/userRole.enum";
import AUTH_PROVIDER from "../enums/authProvider.enum";
import USER_GENDER from "../enums/userGender.enum";
import USER_STATUS from "../enums/userStatus.enum";

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", nullable: false })
  name!: string;

  @Column({ type: "varchar", unique: true, nullable: false })
  email!: string;

  @Column({ type: "varchar", nullable: true })
  password!: string | null;

  @Column({ type: "varchar", nullable: true })
  avatarUrl!: string | null;

  @Column({ type: "varchar", length: 20, nullable: true })
  phone!: string | null;

  @Column({ type: "date", nullable: true })
  birthday!: Date | null;

  @Column({
    type: "enum",
    enum: USER_GENDER,
    nullable: true,
  })
  gender!: USER_GENDER | null;

  @Column({
    type: "enum",
    enum: USER_STATUS,
    default: USER_STATUS.UNVERIFIED,
  })
  status!: USER_STATUS;

  @Column({
    type: "enum",
    enum: USER_ROLE,
    default: USER_ROLE.USER,
  })
  role!: USER_ROLE;

  @Column({
    type: "enum",
    enum: AUTH_PROVIDER,
    default: AUTH_PROVIDER.LOCAL,
  })
  authProvider!: AUTH_PROVIDER;

  // ✅ Custom validation: bắt buộc password nếu authProvider là local
  validatePasswordRequired() {
    if (this.authProvider === AUTH_PROVIDER.LOCAL && !this.password) {
      throw new Error(
        "Password là bắt buộc khi đăng nhập bằng phương thức local"
      );
    }
  };
  @CreateDateColumn()
  startedAt!: Date;
  
  @UpdateDateColumn()
  updatedAt!: Date;
}
