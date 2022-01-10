import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose} from "class-transformer";

export class UserSerializer {
    @Exclude()
    _id: string;
    
    @ApiProperty()
    @Expose()
    email: string;

    @ApiProperty()
    @Expose()
    name: string;
    
    @ApiProperty()
    @Expose()
    lastName:string;
}