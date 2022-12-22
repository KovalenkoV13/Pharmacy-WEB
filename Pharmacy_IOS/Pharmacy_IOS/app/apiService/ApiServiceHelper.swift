//
//  ApiServiceHelper.swift
//  Pharmacy_IOS
//
//  Created by Влад Коваленко on 22.12.2022.
//

import Foundation

enum ApiMethods: String {
    case get = "GET"
    case post = "POST"
}

func configureURLRequest(good: String) -> URLRequest {
    var request: URLRequest

    let queryItems = [
           URLQueryItem(name: "name", value: "\(good)")
       ]
    
    guard var urlComponents = URLComponents(string: "http://127.0.0.1:8000/api/good/") else {
        // если не получится создать компоненты из своих query параметров, то переходим на google
        return URLRequest(url: URL(string: "https://google.com")!)
    }
    
    urlComponents.queryItems = queryItems


    guard let url = urlComponents.url else {
        // если не получится создать url из своего адреса, то переходим на google
        return URLRequest(url: URL(string: "https://google.com")!)
    }

    request = URLRequest(url: url)
    request.httpMethod = ApiMethods.get.rawValue // устанавливаем метод запроса через enum
    return request
}
