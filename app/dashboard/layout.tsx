export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="relative min-h-screen bg-lime-50">

            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
}