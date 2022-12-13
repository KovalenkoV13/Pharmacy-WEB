import { useQuery } from "react-query";

import { Api } from "./PharmacyApi.ts";

const api = new Api();

export const useGoods = () => {
    return useQuery({
        queryKey: ["get-goods"],
        queryFn: async () => {
            let a;
            try {
                const res = await api.good.goodList();
                a = res.error || res.data;
                return a;
            } catch (err) {
                return a;
            }
            // const response = await api.pets.findPets();
            // if (response.error) return response.error;
            // return response.data;
        },
        onSuccess: (res) => {
            // res.error;
        },
        onError: () => {}
    });
};

export const useCategories = () => {
    return useQuery({
        queryKey: ["get-category"],
        queryFn: async () => {
            let a;
            try {
                const res = await api.category.categoryList();
                a = res.error || res.data;
                return a;
            } catch (err) {
                return a;
            }
            // const response = await api.pets.findPets();
            // if (response.error) return response.error;
            // return response.data;
        },
        onSuccess: (res) => {
            // res.error;
        },
        onError: () => {}
    });
};


export const useGoodCat = (idCat) => {
    return useQuery({
        queryKey: ["get-category-good"],
        queryFn: async () => {
            let a;
            try {
                const res = await api.good.goodList({id_cat_id: `${idCat}`});
                a = res.error || res.data;
                return a;
            } catch (err) {
                return a;
            }
            // const response = await api.pets.findPets();
            // if (response.error) return response.error;
            // return response.data;
        },
        onSuccess: (res) => {
            // res.error;
        },
        onError: () => {}
    });
};