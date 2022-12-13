//
//  PharmacyInfoViewController.swift
//  Pharmacy_IOS
//
//  Created by Влад Коваленко on 05.12.2022.
//

import Foundation
import UIKit
private var apiService: ApiService?

final class PharmacyInfoViewController: UIViewController {
    private var goodsData: Goods
    
    
    override func viewDidLoad() {
            super.viewDidLoad()
        }
    init(goodsData: Goods) {
           self.goodsData = goodsData
           super.init(nibName: nil, bundle: nil)
       }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    
}
