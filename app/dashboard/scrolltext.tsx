import { getInfoNotices } from "@/app/action/getinfo-notices";

export default async function ScrollText() {
    const notices = await getInfoNotices();
    console.log(notices);

    if (!notices || notices.length === 0) {
        return (
            <div className="w-full bg-secondary p-2 text-secondary-foreground">
                <p className="whitespace-nowrap overflow-hidden text-ellipsis">No notices found</p>
            </div>
        );
    }

    const noticeText = notices.map((notice: any) => notice.desc || JSON.stringify(notice)).join(" | ");

    return (
        <div className="w-full bg-secondary p-2 text-secondary-foreground overflow-hidden">
            <p className="animate-marquee whitespace-nowrap text-red-500 animate-pulse">
                {noticeText}
            </p>
        </div>
    );
}