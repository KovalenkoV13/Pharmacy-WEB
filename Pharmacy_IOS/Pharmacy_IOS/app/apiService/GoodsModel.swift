//
//  GoodsModel.swift
//  Pharmacy_IOS
//
//  Created by Влад Коваленко on 04.12.2022.
//

import Foundation

struct Goods: Codable {
    var good: Good
    
}

struct Good: Codable {
    var name: String
    var brand: String
    var cost: Float
    var img: String
    var id_cat_id: Int
    var deystvesh: String
}

