import { NextResponse } from "next/server";
import { updateCardDto } from "../dto";
import { prisma } from "@/app/core/prisma";

interface CardRouteContext {
    params: {
        id: string;
    }
}

export async function PATCH (req: Request, { params }: CardRouteContext) {
    const { id } = params;
    const bodyRaw = await req.json();
    const validateBody = updateCardDto.safeParse(bodyRaw);

    if (!validateBody.success) {
        return NextResponse.json(validateBody.error.issues, { status: 400 });
    }

    const findCard = await prisma.cards.findUnique({
        where: {
            id,
        },
    });

    if(!findCard) {
        return NextResponse.json([
            {
                code: "not_found",
                messages: "Card not found"
            }
        ])
    }

    const card = await prisma.cards.update({
        where: {
            id,
        },
        data: validateBody.data,
    });

    return NextResponse.json(card);
}

export async function DELETE(req: Request, { params }:CardRouteContext) {
    const {id} = params;

    const findCards = await prisma.cards.findUnique({
        where: {
            id,
        },
    });

    if(!findCards) {
        return NextResponse.json([
            {
                code: "not_found",
                messages: "Card not found"
            }
        ])
    }

    await prisma.cards.delete({
        where: {
            id,
        },
    });

    return NextResponse.json({}, {status:200})
}