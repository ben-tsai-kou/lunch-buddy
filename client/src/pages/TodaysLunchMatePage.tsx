import React from 'react';

import AvatarLunchCard from '@/components/AvatarLunchCard/avatar-lunch-card.conponent';
import DialogButton from '@/components/DialogButton/dialog-button.component';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { mockingGroupMemberData } from '@/dummyData/dummyData';
import { useLunchMateHook } from '@/hooks/useLunchMateHook';
import { MultiSelect } from '@/components/ui/multi-select';

const TodaysLunchMatePage: React.FC = () => {
    const {
        currentDisplay,
        isPersonalPostModalOpen,
        isGroupPostModalOpen,
        postAvatarData,
        groupPostLunchData,
        setGroupPostDescription,
        setIsPersonalPostModalOpen,
        setIsGroupPostModalOpen,
        handleChangeDisplay,
        handleDisplayLinkClass,
        handlePostLunchList,
        handlePostGroupList,
        setPostDescription,
    } = useLunchMateHook();

    return (
        <div className="flex min-h-screen w-full flex-col bg-gray-200">
            <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
                <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
                    <nav className="grid gap-4 text-sm text-muted-foreground">
                        <button
                            onClick={() => handleChangeDisplay('lunchMate')}
                            className={handleDisplayLinkClass('lunchMate')}
                        >
                            今日のランチ相手探そう
                        </button>
                        <button
                            onClick={() => handleChangeDisplay('lunchGroup')}
                            className={handleDisplayLinkClass('lunchGroup')}
                        >
                            ランチグループ
                        </button>
                    </nav>

                    {currentDisplay === 'lunchMate' && (
                        <div className="grid gap-6 grid-cols-3">
                            {postAvatarData.map(({ userName, description, isAllowanceAvailable }) => (
                                <AvatarLunchCard
                                    className="flex flex-col justify-between"
                                    currentDisplay={currentDisplay}
                                    key={userName}
                                    userName={userName}
                                    description={description}
                                    isAllowanceAvailable={isAllowanceAvailable}
                                />
                            ))}
                            <DialogButton
                                triggerText="ランチ行こう！"
                                modalTitle="お疲れ様です！"
                                modalDescription="今日のランチメート登録しましょう！"
                                submitButtonText="保存"
                                onClick={handlePostLunchList}
                                isOpen={isPersonalPostModalOpen}
                                setIsOpen={setIsPersonalPostModalOpen}
                                footerButtonPosition="center"
                            >
                                <div className="flex flex-col gap-3">
                                    <div className="flex flex-col gap-3">
                                        <Label htmlFor="name" className="text-left">
                                            お名前
                                        </Label>
                                        <Input
                                            id="name"
                                            onChange={(event) => {
                                                setPostDescription((prevState) => ({
                                                    ...prevState,
                                                    userName: event.target.value,
                                                }));
                                            }}
                                            className="col-span-3"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        <Label htmlFor="username" className="text-left">
                                            ランチについての一言
                                        </Label>
                                        <Input
                                            id="username"
                                            onChange={(event) => {
                                                setPostDescription((prevState) => ({
                                                    ...prevState,
                                                    description: event.target.value,
                                                }));
                                            }}
                                            className="col-span-3"
                                        />
                                    </div>
                                </div>
                            </DialogButton>
                        </div>
                    )}

                    {currentDisplay === 'lunchGroup' && (
                        <div className="grid gap-6 grid-cols-2">
                            {groupPostLunchData.map(({ groupMember, restaurant, description }) => (
                                <AvatarLunchCard
                                    className="flex flex-col justify-between"
                                    key={groupMember.join('')}
                                    currentDisplay={currentDisplay}
                                    groupMember={groupMember}
                                    restaurant={restaurant}
                                    description={description}
                                />
                            ))}
                            <DialogButton
                                triggerText="グループ作ろう！"
                                modalTitle="お疲れ様です！"
                                modalDescription="今日は誰に誘ったほうがいいかな？"
                                submitButtonText="保存"
                                onClick={handlePostGroupList}
                                isOpen={isGroupPostModalOpen}
                                setIsOpen={setIsGroupPostModalOpen}
                                footerButtonPosition="center"
                            >
                                <div className="flex flex-col gap-3">
                                    <div className="flex flex-col gap-3">
                                        <MultiSelect
                                            options={mockingGroupMemberData}
                                            onValueChange={(value) =>
                                                setGroupPostDescription((prevState) => ({
                                                    ...prevState,
                                                    groupMember: value,
                                                }))
                                            }
                                            defaultValue={[]}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        <Label htmlFor="username" className="text-left">
                                            ランチについての一言
                                        </Label>
                                        <Input
                                            id="username"
                                            onChange={(event) => {
                                                setGroupPostDescription((prevState) => ({
                                                    ...prevState,
                                                    description: event.target.value,
                                                }));
                                            }}
                                            className="col-span-3"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        <Label htmlFor="username" className="text-left">
                                            レストラン名
                                        </Label>
                                        <Input
                                            id="username"
                                            onChange={(event) => {
                                                setGroupPostDescription((prevState) => ({
                                                    ...prevState,
                                                    restaurant: event.target.value,
                                                }));
                                            }}
                                            className="col-span-3"
                                        />
                                    </div>
                                </div>
                            </DialogButton>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default TodaysLunchMatePage;
