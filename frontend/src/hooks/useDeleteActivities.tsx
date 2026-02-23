export default function useDeleteActivities(auth: any, fetchActivities: any) {

    const handleDelete = async (id: number) => {

        try {
        const res = await fetch(`/api/activities/${id}`, {
            method: "DELETE",
            headers: {
            Authorization: `Bearer ${auth.token}`,
            },
        });

        if (res.ok) {
            fetchActivities(); // Refresh list setelah hapus
        } else {
            alert("Anda tidak memiliki izin untuk menghapus ini.");
        }
        } catch (err) {
            alert("Terjadi kesalahan jaringan.");
        }
    };
    return {
        handleDelete
    }
}