import {Column, PrimaryGeneratedColumn} from "typeorm";

export class UserDto {
    public id: string;

    public username: string;

    public firstname: string;

    public lastname: string;

    public role: string;

    constructor(id: string, username: string, firstname: string, lastname: string, role: string) {
        this.id = id;
        this.username = username
        this.firstname = firstname
        this.lastname = lastname
        this.role = role
    }
}