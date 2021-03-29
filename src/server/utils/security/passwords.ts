import * as bcrypt from 'bcrypt';
// function to 'hash'/encrypt a password and incorporate the 'salt'
export const HashPassword = (password: string) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
}
// function to compare hashed/salted passwords
export const ComparePassword = (password: string, hash: string) => {
    return bcrypt.compareSync(password, hash);
}