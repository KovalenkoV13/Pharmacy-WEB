//
//  GoodsModel.swift
//  Pharmacy_IOS
//
//  Created by Влад Коваленко on 04.12.2022.
//

import Foundation

struct Goods: Codable {
    let results: [Good]
}

struct Good: Codable {
    let name: String
    let brand: String
    let cost: Float
    let img: String
    let id_cat_id: Int
}

