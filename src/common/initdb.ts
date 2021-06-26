import { v4 as uuidv4 } from 'uuid';
import { createUser } from '../resources/users/user.service';

const createAdmin = async (): Promise<void> => {

    const adminUser = {"id": uuidv4(), "name": "admin", "login": "admin", "password": "admin"};
    
    const result = await createUser(adminUser);

    if(result)
        console.log('admin added');
    else    
        console.log('admin exists');
}

export { createAdmin };