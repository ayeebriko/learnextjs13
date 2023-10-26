import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import type { Driver } from "@prisma/client";
const prisma = new PrismaClient();

export const PATCH = async (request: Request, { params }: { params: { id: string } }) => {
    const body: Driver = await request.json();
    const driver = await prisma.driver.update({
        where: {
            id: Number(params.id)
        },
        data: {
            name: body.name,
            driverfee: body.driverfee,
            carId: body.carId
        }
    });
    return NextResponse.json(driver, { status: 200 });
}

export const DELETE = async (request: Request, { params }: { params: {id:string} }) => {
    const driver = await prisma.driver.delete({
        where: {
            id: Number(params.id)
        }
    });
    return NextResponse.json(driver, {status:200});
}