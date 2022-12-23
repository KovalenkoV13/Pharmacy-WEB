//
//  PharmacyInfoViewController.swift
//  Pharmacy_IOS
//
//  Created by Влад Коваленко on 22.12.2022.
//

import Foundation
import UIKit

extension UIImageView {
    func downloaded(from url: URL, contentMode mode: ContentMode = .scaleAspectFit) {
        contentMode = mode
        URLSession.shared.dataTask(with: url) { data, response, error in
            guard
                let httpURLResponse = response as? HTTPURLResponse, httpURLResponse.statusCode == 200,
                let mimeType = response?.mimeType, mimeType.hasPrefix("image"),
                let data = data, error == nil,
                let image = UIImage(data: data)
                else { return }
            DispatchQueue.main.async() { [weak self] in
                self?.image = image
            }
        }.resume()
    }
    func downloaded(from link: String, contentMode mode: ContentMode = .scaleAspectFit) {
        guard let url = URL(string: link) else { return }
        downloaded(from: url, contentMode: mode)
    }
}

final class PharmacyInfoViewController: UIViewController {
    
    private let imageView = UIImageView()
    private let brandLabel = UILabel()
    private let costLabel = UILabel()
    private let nameLabel = UILabel()
    
    private var goodsDataInfo: Goods
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        configure()
        configureDataElements()
    }
    
    init(goodsDataInfo: Goods) {
        self.goodsDataInfo = goodsDataInfo
        super.init(nibName: nil, bundle: nil)
        fillData(withModel: goodsDataInfo)
    }
    
    private func configure() {
        view.backgroundColor = .systemBackground
        navigationController?.navigationBar.tintColor = .black
        navigationController?.navigationBar.titleTextAttributes = [.foregroundColor: UIColor.black]
        navigationItem.title = goodsDataInfo.results.first!.brand
    }
    

    
    private func configureDataElements() {
        nameLabel.lineBreakMode = .byWordWrapping
        nameLabel.numberOfLines = 0
        nameLabel.translatesAutoresizingMaskIntoConstraints = false
        nameLabel.font = UIFont.systemFont(ofSize: 20, weight: .bold)
        nameLabel.textColor = .black
        view.addSubview(nameLabel)
        
        
        costLabel.translatesAutoresizingMaskIntoConstraints = false
        costLabel.font = UIFont.systemFont(ofSize: 20)
        costLabel.textColor = .black
        view.addSubview(costLabel)
        
        brandLabel.translatesAutoresizingMaskIntoConstraints = false
        brandLabel.font = UIFont.systemFont(ofSize: 20)
        brandLabel.textColor = .black
        view.addSubview(brandLabel)
        
        imageView.translatesAutoresizingMaskIntoConstraints = false
        view.addSubview(imageView)
        imageView.heightAnchor.constraint(equalToConstant: 240).isActive = true
        imageView.widthAnchor.constraint(equalToConstant: 240).isActive = true
        imageView.leftAnchor.constraint(equalTo: view.leftAnchor, constant: 70).isActive = true
        imageView.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor).isActive = true
        
        nameLabel.numberOfLines = 0
        nameLabel.preferredMaxLayoutWidth = 350
        nameLabel.leftAnchor.constraint(equalTo: view.leftAnchor, constant: 15).isActive = true
        nameLabel.topAnchor.constraint(equalTo: view.centerYAnchor).isActive = true
       
        
        
        brandLabel.leftAnchor.constraint(equalTo: view.leftAnchor, constant: 15).isActive = true
        brandLabel.topAnchor.constraint(equalTo: view.centerYAnchor, constant: 50).isActive = true
                
        costLabel.topAnchor.constraint(equalTo: view.centerYAnchor,constant: 80).isActive = true
        costLabel.leftAnchor.constraint(equalTo: view.leftAnchor, constant: 15).isActive = true
        
    }
    
    func fillData(withModel: Goods) {
        brandLabel.text = "Бренд: " + String(withModel.results.first!.brand)
        costLabel.text = "Цена: " + String(withModel.results.first!.cost) + " руб."
        nameLabel.text = String(withModel.results.first!.name)
        imageView.downloaded(from: withModel.results.first!.img)
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
}
    
    

