import RealtimeCases from "./realtime-cases";

export default function Dashboard() {
    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
            <RealtimeCases />
        </div>
    );
}
