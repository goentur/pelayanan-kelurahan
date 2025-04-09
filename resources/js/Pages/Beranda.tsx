import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Beranda() {
    const judul = "Beranda"
    return (
        <AuthenticatedLayout header={judul}>
            <Head title={judul} />
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl">Beranda</CardTitle>
                </CardHeader>
                <CardContent>
                    You're logged in!
                </CardContent>
            </Card>
        </AuthenticatedLayout>
    );
}
