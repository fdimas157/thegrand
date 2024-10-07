package org.pubpasim.backend.service;

import org.pubpasim.backend.model.Booking;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
public class MidtransService {

    private final String serverKey = "SB-Mid-server-mCQCQ6II-_ricEVGOztcg8wK"; // Ganti dengan Server Key Anda
    private final String snapUrl = "https://app.sandbox.midtrans.com/snap/v1/transactions"; // Gunakan sandbox untuk pengujian

    public String getSnapToken(Booking booking) {
        RestTemplate restTemplate = new RestTemplate();

        // Menyiapkan headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBasicAuth(serverKey, "");

        // Menyiapkan body request
        Map<String, Object> body = new HashMap<>();
        body.put("transaction_details", Map.of(
                "order_id", UUID.randomUUID(),
                "gross_amount", booking.getTotalPrice()
        ));
        
        body.put("customer_details", Map.of(
                "first_name", booking.getCustomerId().getFirstName(),
                "last_name", booking.getCustomerId().getLastName(),
                "email", booking.getCustomerId().getEmail(),
                "phone", booking.getCustomerId().getPhone()
        ));

        body.put("item_details",
            Map.of(
                "id", booking.getHotelId().getId(),
                "price", booking.getHotelId().getPrice(),
                "quantity", booking.getNights(),
                "name", booking.getHotelId().getName()
            )
        );

        System.out.println(body);
        HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);

        try {
            ResponseEntity<Map> response = restTemplate.exchange(snapUrl, HttpMethod.POST, request, Map.class);
            if (response.getStatusCode() == HttpStatus.OK || response.getStatusCode() == HttpStatus.CREATED) {
                Map<String, Object> responseBody = response.getBody();
                if (responseBody != null && responseBody.containsKey("token")) {
                    return responseBody.get("token").toString();
                }
            }
            return null;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
