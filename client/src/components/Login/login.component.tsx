import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '../ui/spinner';

const loginSchema = z.object({
    email: z.string().email('正しいメールアドレス形式で入力してください'),
    password: z.string().min(1, 'パスワードを入力してください'),
});

type LoginFormData = z.infer<typeof loginSchema>;

type LoginProps = {
    onLoginButtonClick: (userLoginInfo: LoginFormData) => void;
    isLoading?: boolean;
    handleToggleClickRegister: () => void;
};

const Login = ({ onLoginButtonClick, isLoading = false, handleToggleClickRegister }: LoginProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        mode: 'onBlur',
    });

    return isLoading ? (
        <Spinner />
    ) : (
        <Card className="mx-auto max-w-sm">
            <CardHeader>
                <CardTitle className="text-2xl">Login</CardTitle>
                <CardDescription>Enter your email below to login to your account</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="m@example.com" required {...register('email')} />
                        {errors.email && (
                            <span className="text-red-500 text-xs">{errors.email.message?.toString()}</span>
                        )}
                    </div>
                    <div className="grid gap-2">
                        <div className="flex items-center">
                            <Label htmlFor="password">Password</Label>
                            <Link to="#" className="ml-auto inline-block text-sm underline">
                                Forgot your password?
                            </Link>
                        </div>
                        <Input id="password" type="password" required {...register('password')} />
                        {errors.password && (
                            <span className="text-red-500 text-xs">{errors.password.message?.toString()}</span>
                        )}
                    </div>
                    <Button
                        type="submit"
                        onClick={handleSubmit((data) => onLoginButtonClick(data))}
                        className={`w-full ${Object.keys(errors).length > 0 ? 'cursor-not-allowed' : ''}`}
                        disabled={Object.keys(errors).length > 0}
                    >
                        Login
                    </Button>
                </div>
                <div className="mt-4 text-center text-sm">
                    Don&apos;t have an account?{' '}
                    <Link to="#" className="underline" onClick={handleToggleClickRegister}>
                        Sign up
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
};

export default Login;
