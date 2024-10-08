package org.pubpasim.backend.controller;

import java.util.List;
import java.util.Optional;

import org.pubpasim.backend.model.Customer;
import org.pubpasim.backend.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("api/customer")
public class CustomerController {
    @Autowired
    CustomerRepository customerRepository;

    public CustomerController(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @GetMapping
    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    @GetMapping("{id}")
    public Optional<Customer> getCustoomerById(@PathVariable Long id) {
        return customerRepository.findById(id);
    }

    @GetMapping("last-idx")
    public Customer getLastIndex() {
        return customerRepository.findLastUser();
    }

    @GetMapping("byemail/{email}")
    public Optional<Customer> getCustomerByEmail(@PathVariable String email){
        return customerRepository.findByEmail(email);
    }

    @PostMapping
    public Customer addNewCustomer(@RequestBody Customer customer) {
        return customerRepository.save(customer);
    }

    @PutMapping("{id}")
    public Customer updateCustomer(@PathVariable Long id, @RequestBody Customer customer) {
        return customerRepository.findById(id)
                .map(customerData -> {
                    customerData.setFirstName(customer.getFirstName());
                    customerData.setLastName(customer.getLastName());
                    customerData.setAge(customer.getAge());
                    customerData.setAddress(customer.getAddress());
                    customerData.setEmail(customer.getEmail());
                    customerData.setPassword(customer.getPassword());
                    customerData.setPhone(customer.getPhone());
                    return customerRepository.save(customerData);
                })
                .orElseThrow(() -> new RuntimeException("Customer tidak ditemukan dengan ID = " + id));
    }

    @DeleteMapping("{id}")
    public void deleteCustomer(@PathVariable Long id) {
        customerRepository.deleteById(id);
    }
}
