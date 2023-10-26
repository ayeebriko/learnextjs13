"use client";
import { useState, SyntheticEvent } from "react";
import type { Car } from "@prisma/client";
import { useRouter } from "next/navigation";
import axios from "axios";

type Driver = {
    id: number;
    name: string;
    driverfee: number;
    carId: number;
}

const UpdateDriver = ({ cars, driver }: { cars: Car[];driver: Driver }) => {
    const [name, setName] = useState(driver.name);
    const [driverfee, setDriverfee] = useState(driver.driverfee);
    const [car, setCar] = useState(driver.carId);
    const [isOpen, setIsOpen] = useState(false);

    const router = useRouter();

    const handleUpdate = async (e: SyntheticEvent) => {
        e.preventDefault();
        await axios.patch(`/api/drivers/${driver.id}`, {
            name: name,
            driverfee: Number(driverfee),
            carId: Number(car)
        });
        router.refresh();
        setIsOpen(false);
    };

    const handleModal = () => {
        setIsOpen(!isOpen);
        setName(driver.name);
        setDriverfee(driver.driverfee);
        setCar(driver.carId);
    }

    return (
        <div>
            <button className="btn btn-info btn-sm" onClick={handleModal}>Edit</button>
            <div className={isOpen ? 'modal modal-open' : 'modal'}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Update Driver "{driver.name}"</h3>
                    <form onSubmit={handleUpdate}>
                        <div className="form-control w-full">
                            <label className="label font-bold">Driver Name</label>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="input input-bordered" placeholder="Driver Name" />
                        </div>
                        <div className="form-control w-full">
                            <label className="label font-bold">Driver Fee</label>
                            <input type="text" value={driverfee} onChange={(e) => setDriverfee(Number(e.target.value))} className="input input-bordered" placeholder="Driver Fee" />
                        </div>
                        <div className="form-control w-full">
                            <label className="label font-bold">Car</label>
                            <select value={car} onChange={(e) => setCar(Number(e.target.value))} className="select select-bordered">
                                {cars.map((car) => (
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

export default UpdateDriver;