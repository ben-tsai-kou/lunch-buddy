import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const RegisterSchema = z.object({
    nickname: z.string().min(1, { message: 'ニックネームは必要です' }),
    email: z
        .string()
        .email('メールが正しくありません。')
        .refine((email) => email.split('@')[1] === import.meta.env.VITE_VALID_DOMAIN, {
            message: '入力されたメールアドレスのドメインは無効です',
        }),
    password: z.string().min(8, 'パスワードは8文字以上で入力してください'),
});

type UserRegisterFormData = z.infer<typeof RegisterSchema>;

type RegisterProps = {
    handleToggleClickRegister: () => void;
    handleSubmitRegisterMail: (data: { nickname: string; email: string; password: string }) => void;
    isButtonDisable?: boolean;
};

const Register = ({ handleToggleClickRegister, handleSubmitRegisterMail, isButtonDisable = false }: RegisterProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UserRegisterFormData>({
        resolver: zodResolver(RegisterSchema),
        mode: 'onBlur',
    });
    return (
        <Card className="mx-auto min-w-80 md:min-w-96">
            <CardHeader>
                <CardTitle className="text-xl">新規登録</CardTitle>
                <CardDescription>アカウント作りましょう！</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4">
                    <div className="grid gap-4 w-100">
                        <div className="grid gap-2">
                            <Label htmlFor="nickname">ニックネーム</Label>
                            <Input {...register('nickname')} id="nickname" placeholder="Max" required />
                            {errors.nickname && (
                                <span className="text-red-500 text-xs">{errors.nickname.message?.toString()}</span>
                            )}
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">メールアドレス</Label>
                        <Input {...register('email')} id="email" type="email" placeholder="m@example.com" required />
                        {errors.email && (
                            <span className="text-red-500 text-xs">{errors.email.message?.toString()}</span>
                        )}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">パスワード</Label>
                        <Input {...register('password')} id="password" type="password" />
                        {errors.password && (
                            <span className="text-red-500 text-xs">{errors.password.message?.toString()}</span>
                        )}
                    </div>
                    <Button
                        type="submit"
                        className="w-full"
                        onClick={handleSubmit((userInput) => handleSubmitRegisterMail(userInput))}
                        disabled={isButtonDisable || Object.keys(errors).length > 0}
                    >
                        確認画面へ
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
