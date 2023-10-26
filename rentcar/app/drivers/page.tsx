import { PrismaClient } from "@prisma/client";
import AddDriver from "./addDriver";
import DeleteDriver from "./deleteDriver";
import UpdateDriver from "./updateDriver";

export const revalidate = 0

const prisma = new PrismaClient();

const getDrivers = async () => {
    const res = await prisma.driver.findMany({
        select: {
            id: true,
            name: true,
            driverfee: true,
            carId: true,
            car: true,
        }
    });
    return res;
};

const getCars = async () => {
    const res = await prisma.car.findMany();
    return res;
}

const Driver = async () => {
    const [drivers,cars] = await Promise.all([
        getDrivers(),
        getCars()
    ]);
    return (
        <div>
            <div className="mb-2"><AddDriver cars={cars} /></div>
            <table className="table w-full">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Driver Name</th>
                    <th>Driver Fee</th>
                    <th>Car</th>
                    <th className="text-center">Actions</th>
                </tr>
            </thead>
                <tbody>
                    {drivers.map((driver, index) => (
                        <tr key={driver.id}>
                            <td>{index+1}</td>
                            <td>{driver.name}</td>
                            <td>{driver.driverfee}</td>
                            <td>{driver.car.name}</td>
                            <td className="flex justify-center space-x-2">
                                <UpdateDriver cars={cars} driver={driver} />
                                <DeleteDriver driver={driver} />
                            </td>
                        </tr>
                    ))}
                
            </tbody>
           </table>
        </div>
    )
}

export default Driver