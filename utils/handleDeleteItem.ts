import { confirmationModalRef } from "@/utils/confirmationRef";


export const handleDeleteItem = async ({
    title = "Delete Item?",
    description = "Are you sure you want to delete this item?",
    confirmText = "Delete it!",
    cancelText = "Cancel",
} = {}) => {
    const confirmed = await confirmationModalRef.current?.showConfirmation(
        title,
        description,
        confirmText,
        cancelText
    );

    return confirmed;
};
