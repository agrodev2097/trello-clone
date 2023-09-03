import { NextResponse } from "next/server";
import { createBoardDto } from "../dto";
import { prisma } from "@/app/core/prisma";

interface BoardRouteContext {
    params: {
        id: string;
    }
}

export async function PUT(req:Request, { params }: BoardRouteContext) {
    const { id } = params;
    const bodyRaw = await req.json();
    const validateBody = createBoardDto.safeParse(bodyRaw);

    if (!validateBody.success) {
        return NextResponse.json(validateBody.error.issues, {
            status: 400,
        });
    }
    const findBoard = await prisma.boards.findUnique({
        where: {
            id,
        },
    });

    if (!findBoard) {
        return NextResponse.json([
            {
            code: "not_found",
            message: "Board not found"
            }
        ]);
    };
    const updateBoard = await prisma.boards.update({
        where: {
            id,
        },
        data: validateBody.data
    })
    
    return NextResponse.json(updateBoard)
}

interface BoardRouteContext {
    params: {
        id: string;
    }
}


export async function DELETE(req: Response, { params }:BoardRouteContext) {
    const { id } = params;

    const findBoard = await prisma.boards.findUnique({
        where: {
            id,
        },
    });

    if (!findBoard) {
        return NextResponse.json([
            {
                code: "not_found",
                messages: "Board not found",
            }
        ])
    }

    await prisma.boards.delete({
        where: {
            id,
        },
    });

    return NextResponse.json({}, { status: 200 })
}