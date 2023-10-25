import { Request, Response } from "express";
import { prisma } from "../database";

export default {
    async createUser(request: Request, response: Response) {
        try {
            const { name, email } = request.body;
            const userExistis = await prisma.user.findUnique({ where: { email } });

            if(userExistis) {
                return response.json({
                    error: true,
                    message: 'Erro: Usuário já existe!'
                });
            }

            const user = await prisma.user.create({
                data: {
                    name,
                    email
                }
            });

            return response.json({
                error: false,
                message: 'Sucesso: Usuário cadastrado com sucesso',
                user
            });
            
        } catch(error) {
            return response.json({ message: error.message })
        }
    }
}