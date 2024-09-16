import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';

type DialogButtonProps = {
    children?: React.ReactNode;
    triggerText: string;
    modalTitle?: string;
    modalDescription?: string;
    submitButtonText: string;
    isOpen?: boolean;
    setIsOpen?: (isOpen: boolean) => void;
    type?: 'button' | 'submit';
    onClick?: () => void;
    triggerButtonType?: 'black' | 'white';
    footerButtonPosition?: 'left' | 'right' | 'center';
};

const DialogButton = ({
    children,
    triggerText,
    modalTitle = '',
    modalDescription = '',
    submitButtonText,
    isOpen = false,
    setIsOpen,
    type = 'submit',
    onClick,
    triggerButtonType = 'white',
    footerButtonPosition = 'center',
}: DialogButtonProps) => {
    const buttonPositionClassName = {
        left: 'px-10 py-2 mr-auto',
        right: 'px-10 py-2 ml-auto',
        center: 'py-2 w-full m-auto',
    };

    const triggerButtonBackgroundColor = {
        black: 'bg-primary text-white',
        white: '',
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button className={`w-full ${triggerButtonBackgroundColor[triggerButtonType]}`} variant="outline">
                    {triggerText}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    {modalTitle && <DialogTitle>{modalTitle}</DialogTitle>}
                    {modalDescription && <DialogDescription>{modalDescription}</DialogDescription>}
                </DialogHeader>
                {children}
                <DialogFooter>
                    <Button
                        className={buttonPositionClassName[footerButtonPosition]}
                        type={type}
                        onClick={() => onClick && onClick()}
                    >
                        {submitButtonText}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default DialogButton;
