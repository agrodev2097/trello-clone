import { useQuery } from "@tanstack/react-query";
import { Boards } from "@prisma/client";
import { api } from "@/app/core/api";

const getBoardsFn = async () => {
  const { data } = await api.get<Boards[]>("/api/boards");
  return data;
};
interface UseBoardsOptions {
  initialData: Boards[];
}

export const useBoardsQueryKey = ["boards"];
export const useBoards = ({ initialData }: UseBoardsOptions) => {
  return useQuery({
    queryKey: useBoardsQueryKey,
    queryFn: getBoardsFn,
    initialData,
  });
};
