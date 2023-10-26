import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import type { Driver } from "@prisma/client";
const prisma = new PrismaClient();

export const POST = async (request: Request) => {
    const body: Driver = await request.json();
    const driver = await prisma.driver.create({
        data: {
            name: body.name,
            driverfee: body.driverfee,
            carId: body.carId
        }
    });
    return NextResponse.json(driver, { status: 201 });
}