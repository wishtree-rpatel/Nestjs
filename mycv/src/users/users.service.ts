import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './users.entity';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(UserEntity) private repo : Repository<UserEntity>){}

    create(email : string , password : string){
        const user = this.repo.create({email , password})
        return this.repo.save(user)
    }

    async findOne(id : number){
        const user = await this.repo.findOne(id);
        if(!user){
            throw new NotFoundException('User not found')
        }
        return user;

    }

    find(email : string){
        return this.repo.find({email})
    }

    async update(id : number , attrs : Partial<UserEntity>){
        const user = await this.repo.findOne(id);
        if(!user){
            throw new NotFoundException("User not found")
        }
        Object.assign(user , attrs); 
        return this.repo.save(user)

    }
    async remove(id : number){
        const user = await this.repo.findOne(id);
        if(!user){
            throw new NotFoundException('User not found')
        }
        return this.repo.remove(user);
    }
}
