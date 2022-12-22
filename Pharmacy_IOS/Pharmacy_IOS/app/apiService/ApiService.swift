//
//  ApiService.swift
//  Pharmacy_IOS
//
//  Created by Влад Коваленко on 22.12.2022.
//

import Foundation


final class ApiService {
    
    func getGoodsData(good: String, completion: @escaping (Goods?, Error?)-> ()) {
        let request = configureURLRequest(good: good) // конфигурация кастомного запроса
        URLSession.shared.dataTask(with: request, completionHandler: { data, response, error in  // completionHandler – замыкание для обработки  данных  в другом слое (в данном случае  view controller)
            if let error = error {
                print("error")
                completion(nil, error)
            }
            if let response = response {
                print(response)
            }
            guard let data = data else {
                completion(nil, error)
                return
            }

            do {
                let goodsListData = try JSONDecoder().decode(Goods.self, from: data) //декодируем json в созданную струткру с данными
                completion(goodsListData, nil)
            } catch let error {
                completion(nil, error)
            }
        }).resume() // запускаем задачу
    }
}
