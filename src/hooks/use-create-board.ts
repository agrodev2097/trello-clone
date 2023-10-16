import { api } from "@/app/core/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateBoardDto } from "@/app/api/boards/dto";
import { Boards } from "@prisma/client";
import { useBoardsQueryKey } from "@/hooks/use-boards";

const createBoardFn = async (board: CreateBoardDto) => {
  const { data } = await api.post<Boards>("/api/boards", board);

  return data;
};

export const useCreateBoard = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createBoardFn,
    onSettled: () => {
      queryClient.invalidateQueries(useBoardsQueryKey);
    },
  });
};
