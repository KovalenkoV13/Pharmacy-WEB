//
//  ViewController.swift
//  Pharmacy_IOS
//
//  Created by Влад Коваленко on 04.12.2022.
//

import UIKit
private var apiService: ApiService?


extension PharmacyViewController: UITableViewDelegate {
    func numberOfSections(in tableView: UITableView) -> Int { // количество секций в таблице
        1
    }
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        let PharmacyInfoViewController = PharmacyInfoViewController(goodsDataInfo: self.goodsData[indexPath.row])
            navigationController?.pushViewController(PharmacyInfoViewController, animated: true)
        }
    
}
extension PharmacyViewController: UITableViewDataSource {
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int { // количество строк в секции
        goodsData.count
    }
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell { // установка ячейки для таблицы
            guard let cell = tableView.dequeueReusableCell(withIdentifier: "listCell", for: indexPath) as? pharmacyTableViewCell else { return .init() }
            cell.configure(withModel: goodsData[indexPath.row])
            return cell
        }
}

final class PharmacyViewController: UIViewController {
    var goodsData = [Goods]()

    private lazy var pharmacyTableView: UITableView = {
        let tableView = UITableView()
        tableView.translatesAutoresizingMaskIntoConstraints = false
        tableView.delegate = self
        tableView.dataSource = self
        tableView.register(pharmacyTableViewCell.self, forCellReuseIdentifier: "listCell")
        tableView.estimatedRowHeight = view.bounds.height / 3
        return tableView
    }()
    
    
    
    
    private func setupPharmacyTableView() {
        view.addSubview(pharmacyTableView)
        pharmacyTableView.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor).isActive = true
        pharmacyTableView.bottomAnchor.constraint(equalTo: view.safeAreaLayoutGuide.bottomAnchor).isActive = true
        pharmacyTableView.leftAnchor.constraint(equalTo: view.safeAreaLayoutGuide.leftAnchor).isActive = true
        pharmacyTableView.rightAnchor.constraint(equalTo: view.safeAreaLayoutGuide.rightAnchor).isActive = true
        }
    
    private func loadGoodsData(goods: [String]) {
               guard let apiService = apiService else { // раскрытие опциональной переменной apiService
                   return
               }

           goods.forEach {
                   apiService.getGoodsData(good: $0, completion: { [weak self] (goodsListData, error) in // weak self для избежания цикла сильных ссылок из-за замыкания completion
                       DispatchQueue.main.async { // запуск асинхронной задачи на main потоке из-за обработки на ui !!!
                           guard let self = self else { return }
                           if let error = error {
            // показ ошибки
                               self.present(UIAlertController(title: "ERROR", message: error.localizedDescription, preferredStyle: .alert), animated: true)
                               return
                           }
                           if let goodsListData = goodsListData {
                               self.goodsData.append(goodsListData) // массив с данными о погоде
                           }
                           self.pharmacyTableView.reloadData() // перезагрузка таблицы для отображения новых данных
                       }
                   })
               }
           }
    
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        view.backgroundColor = .white
        self.navigationItem.title = "Список товаров"
        self.navigationController?.navigationBar.prefersLargeTitles = true
        setupPharmacyTableView()
        apiService = ApiService()
        loadGoodsData(goods: ["Супрастин таблетки 25мг №40","Зодак таблетки покрытые оболочкой 10мг №30","Лоратадин Тева таблетки 10мг №10","Эриус таблетки покрытые оболочкой 5мг №20","Теоритин МФ таблетки 4мг №10","Терафлю Экстратаб таб покрытые оболочкой №10","Минирин Мелт таблетки лиофилизат 60мкг №30", "Роксера таблетки покрытые оболочкой 20мг №30","Вода для инъекций 5мл №10", "Бензилбензоат мазь 20% 30г", "Тербизил крем 1% 15г", "Глицин таблетки сублингвальные 100мг №100 Биотики","Эспумизан капсулы 40мг №25","Аспирин Кардио таблетки покрытые оболочкой 100мг №98","Тантум Верде раствор наружный 0,15% 500мл","Брилинта таблетки покрытые оболочкой 90мг №168"])
    }
    






    
    
    


}
