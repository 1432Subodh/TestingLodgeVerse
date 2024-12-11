'use client';
import { db } from '@/config/FirebaseConfig';
import { deleteDoc, doc } from 'firebase/firestore';
import React from 'react';
import toast, { Toaster } from 'react-hot-toast';

// Define the props type
interface DeleteProps {
    id: string; // `id` is a required string prop
} 
function Delete({id}:DeleteProps) {
    const deleteItem = async () => {
        toast.promise(
            new Promise(async (resolve, reject) => {
                try {
                    // Attempt to delete the document
                    await deleteDoc(doc(db, 'LodgeData', id));
                    resolve('Item successfully deleted.');
                } catch (error:any) {
                    reject(error.message || 'Failed to delete item.');
                }
            }),
            {
                loading: 'Deleting item...',
                success: 'Item deleted successfully! 🎉',
                error: 'Failed to delete item. Please try again. 😢',
            }
        );
    };

    return (
        <div>
            <Toaster /> {/* Renders toast notifications */}
            <div onClick={deleteItem} className="cursor-pointer text-red-500 hover:underline">
                Delete
            </div>
        </div>
    );
}

export default Delete;
