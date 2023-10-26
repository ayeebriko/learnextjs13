"use client";
import { useState, SyntheticEvent } from "react";
import type { Car } from "@prisma/client";
import { useRouter } from "next/navigation";
import axios from "axios";

const AddDriver = ({ cars }: { cars: Car[] }) => {
    const [name, setName] = useState("");
    const [driverfee, setDriverfee] = useState("");
    const [car, setCar] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const router = useRouter();

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        await axios.post('/api/drivers', {
            name: name,
            driverfee: Number(driverfee),
            carId: Number(car)
        })
        setName("");
        setDriverfee("");
        setCar("");
        router.refresh();
        setIsOpen(false);
    };

    const handleModal = () => {
        setIsOpen(!isOpen);
        setName("");
        setDriverfee("");
        setCar("");
    }

    return (
        <div>
            <button className="btn" onClick={handleModal}>Add New</button>
            <div className={ isOpen ? 'modal modal-open':'modal'}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Add New Driver</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-control w-full">
                            <label className="label font-bold">Driver Name</label>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value) } className="input input-bordered" placeholder="Driver Name" />
                        </div>
                        <div className="form-control w-full">
                            <label className="label font-bold">Driver Fee</label>
                            <input type="text" value={driverfee} onChange={(e) => setDriverfee(e.target.value)} className="input input-bordered" placeholder="Driver Fee" />
                        </div>
                        <div className="form-control w-full">
                            <label className="label font-bold">Car</label>
                            <select value={car} onChange={(e) => setCar(e.target.value)} className="select select-bordered">
                                <option value="" disabled>Select a Car</option>
                                {cars.map((car)=>(
                                    <option value={car.id} key={car.id}>{car.name}</option>
                                ))}
                                
                            </select>
                        </div>
                        <div className="modal-action">
                        <button type="button" className="btn" onClick={handleModal}>Close</button>
                            <button type="submit" className="btn btn-primary">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddDriver;