
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform, Type } from 'class-transformer';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class LoginDto {
    @Expose()
    @Type(() => String)
    @ApiProperty({
        type: String,
        description: 'Username of the user',
        minLength: 4,
        maxLength: 120,
    })
    @Transform(({ value }) => value?.toLowerCase()?.trim())
    @IsString()
    @MinLength(4)
    @MaxLength(120)
    username: string;
    @Expose()
    @Type((_type) => String)
    @ApiProperty({
        type: String,
        description: 'Password of the user',
        minLength: 4,
        maxLength: 255,
    })
    @Transform(({ value }) => value?.trim())
    @IsString()
    @MinLength(4)
    @MaxLength(255)
    password: string;
}
