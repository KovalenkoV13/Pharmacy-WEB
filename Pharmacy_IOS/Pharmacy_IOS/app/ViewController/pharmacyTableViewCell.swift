//
//  pharmacyTableViewCell.swift
//  Pharmacy_IOS
//
//  Created by Влад Коваленко on 22.12.2022.
//

import Foundation

import Foundation
import UIKit

final class pharmacyTableViewCell: UITableViewCell {
    override init(style: UITableViewCell.CellStyle, reuseIdentifier: String?) {
        super.init(style: style, reuseIdentifier: reuseIdentifier)
        
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    func configure(withModel goods: Goods) {
        textLabel?.text = goods.results.first?.name
        }
}

