import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UserRegisterFormDataKey } from '@/types/LoginUserInput';

type RegisterProps = {
    handleToggleClickRegister: () => void;
    handleUpdateUserInfo: ({ key, value }: { key: UserRegisterFormDataKey; value: string }) => void;
    handleSubmitRegisterMail: () => void;
    isButtonDisable?: boolean;
};

const Register = ({
    handleToggleClickRegister,
    handleUpdateUserInfo,
    handleSubmitRegisterMail,
    isButtonDisable = false,
}: RegisterProps) => {
    return (
        <Card className="mx-auto max-w-sm">
            <CardHeader>
                <CardTitle className="text-xl">Sign Up</CardTitle>
                <CardDescription>Enter your information to create an account</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4">
                    <div className="grid gap-4 w-100">
                        <div className="grid gap-2">
                            <Label htmlFor="nickname">nickname</Label>
                            <Input
                                id="nickname"
                                placeholder="Max"
                                required
                                onChange={(e) => {
                                    handleUpdateUserInfo({ key: 'nickname', value: e.target.value });
                                }}
                            />
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="m@example.com"
                            required
                            onChange={(e) => {
                                handleUpdateUserInfo({ key: 'email', value: e.target.value });
                            }}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            onChange={(e) => {
                                handleUpdateUserInfo({ key: 'password', value: e.target.value });
                            }}
                        />
                    </div>
                    <Button
                        type="submit"
                        className="w-full"
                        onClick={handleSubmitRegisterMail}
                        disabled={isButtonDisable}
                    >
                        Create an account
                    </Button>
                </div>
                <div className="mt-4 text-center text-sm">
                    Already have an account?
                    <Link to="#" className="underline" onClick={handleToggleClickRegister}>
                        Sign in
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
};

export default Register;
