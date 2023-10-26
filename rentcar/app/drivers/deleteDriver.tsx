"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

type Driver = {
    id: number;
    name: string;
    driverfee: number;
    carId: number;
}
const DeleteDriver = ({ driver }: { driver: Driver }) => {
    const [isOpen, setIsOpen] = useState(false);

    const router = useRouter();

    const handleDelete = async (driverId: number) => {
        await axios.delete(`/api/drivers/${driverId}`);
        router.refresh();
        setIsOpen(false);
    };

    const handleModal = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div>
            <button className="btn btn-error btn-sm" onClick={handleModal}>Delete</button>
            <div className={isOpen ? 'modal modal-open' : 'modal'}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Are You Sure to Delete "{driver.name}" ?</h3>                        
                        <div className="modal-action">
                            <button type="button" className="btn" onClick={handleModal}>No</button>
                        <button type="button" className="btn btn-primary" onClick={() => handleDelete(driver.id)}>Yes</button>
                        </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteDriver;