import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Badge } from '../ui/badge';
import DialogButton from '../DialogButton/dialog-button.component';
import React from 'react';
import { useToast } from '../ui/use-toast';

type CommonProps = {
    onClick?: () => void;
    className?: string;
};

type LunchMateProps = CommonProps & {
    currentDisplay: 'lunchMate';
    userName: string;
    description: string;
    isAllowanceAvailable: boolean;
};

type LunchGroupProps = CommonProps & {
    currentDisplay: 'lunchGroup';
    groupMember: Array<string>;
    restaurant: string;
    description: string;
};

type AvatarLunchCardProps = LunchMateProps | LunchGroupProps;

const AvatarLunchCard = ({ currentDisplay, className, ...props }: AvatarLunchCardProps) => {
    const { toast } = useToast();

    if (currentDisplay === 'lunchMate') {
        const { userName, description, isAllowanceAvailable, onClick } = props as LunchMateProps;

        const [isOpen, setIsOpen] = React.useState(false);

        const handleInviteSubmit = () => {
            onClick && onClick();
            setIsOpen(false);
            toast({
                title: 'ランチの誘いを送りました！',
                duration: 3000,
            });
        };

        return (
            <Card className={className}>
                <CardHeader className="flex flex-row items-center gap-3">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger className="cursor-auto">
                                <div
                                    className={`w-6 h-6 rounded-full ${isAllowanceAvailable ? 'bg-lime-500' : 'bg-slate-500'}`}
                                />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{isAllowanceAvailable ? 'ランチ代あり' : 'ランチ代なし'}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                    <div className="flex flex-col gap-2">
                        <CardTitle>{userName}</CardTitle>
                        <CardDescription>{description}</CardDescription>
                    </div>
                </CardHeader>
                <CardFooter className="px-6 py-4 w-full">
                    <DialogButton
                        triggerText="ランチの誘い"
                        modalTitle={`${userName}さんにランチの誘いを送りますか？`}
                        submitButtonText="さぁ、行こう！"
                        onClick={handleInviteSubmit}
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                        footerButtonPosition="center"
                        triggerButtonType="black"
                    />
                </CardFooter>
            </Card>
        );
    } else {
        const { groupMember, description, restaurant, onClick } = props as LunchGroupProps;
        return (
            <Card className={className}>
                <CardHeader className="flex gap-3">
                    <CardTitle>{description}</CardTitle>
                    <div className="flex flex-col gap-3">
                        メンバー 👇🏻{' '}
                        <div className="text-sm">
                            {groupMember.map((item) => (
                                <Badge key={item}>{item}</Badge>
                            ))}
                        </div>
                    </div>

                    <CardDescription>ランチ予定 👉🏻 {restaurant}</CardDescription>
                </CardHeader>
                <CardFooter className="px-6 py-4 w-full">
                    <Button className="w-full" onClick={onClick && onClick}>
                        グループに参加
                    </Button>
                </CardFooter>
            </Card>
        );
    }
};

export default AvatarLunchCard;
