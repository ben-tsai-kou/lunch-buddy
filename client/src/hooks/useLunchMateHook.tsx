import { useToast } from '@/components/ui/use-toast';
import { mockingAvatarData, mockingGroupData } from '@/dummyData/dummyData';
import React from 'react';

export const useLunchMateHook = () => {
    const { toast } = useToast();

    const [currentDisplay, setCurrentDisplay] = React.useState<'lunchMate' | 'lunchGroup'>('lunchMate');
    const [isPersonalPostModalOpen, setIsPersonalPostModalOpen] = React.useState(false);
    const [isGroupPostModalOpen, setIsGroupPostModalOpen] = React.useState(false);
    const [groupPostLunchData, setGroupPostLunchData] = React.useState(mockingGroupData);

    const [postDescription, setPostDescription] = React.useState<(typeof mockingAvatarData)[number]>({
        userName: '',
        description: '',
        isAllowanceAvailable: true,
    });
    const [groupPostDescription, setGroupPostDescription] = React.useState<(typeof mockingGroupData)[number]>({
        groupMember: [],
        restaurant: '',
        description: '',
    });

    // TODO - zustand に postAvatarData を管理する
    const [postAvatarData, setPostAvatarData] = React.useState<typeof mockingAvatarData>(mockingAvatarData);

    const handleChangeDisplay = (display: 'lunchMate' | 'lunchGroup') => setCurrentDisplay(display);
    const handleDisplayLinkClass = (display: 'lunchMate' | 'lunchGroup') => {
        return currentDisplay === display ? 'font-semibold text-primary text-left' : 'text-left';
    };

    const handlePostLunchList = () => {
        setPostAvatarData([...postAvatarData, postDescription]);
        setIsPersonalPostModalOpen(false);
        setPostDescription({
            userName: '',
            description: '',
            isAllowanceAvailable: true,
        });
        toast({
            title: 'ランチメートを登録しました！',
            duration: 3000,
        });
    };

    const handlePostGroupList = () => {
        setGroupPostLunchData([...groupPostLunchData, groupPostDescription]);
        setIsGroupPostModalOpen(false);
        toast({
            title: 'ランチグループを登録しました！',
            duration: 3000,
        });
    };

    return {
        currentDisplay,
        isPersonalPostModalOpen,
        postAvatarData,
        groupPostLunchData,
        isGroupPostModalOpen,
        setIsGroupPostModalOpen,
        setGroupPostDescription,
        setIsPersonalPostModalOpen,
        setPostDescription,
        handleChangeDisplay,
        handleDisplayLinkClass,
        handlePostLunchList,
        handlePostGroupList,
    };
};
