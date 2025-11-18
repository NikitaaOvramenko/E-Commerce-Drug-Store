package com.nikitaovramenko.ecommerce.drug_store.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.nikitaovramenko.ecommerce.drug_store.dto.RatingDto;
import com.nikitaovramenko.ecommerce.drug_store.model.Drug;
import com.nikitaovramenko.ecommerce.drug_store.model.Rating;
import com.nikitaovramenko.ecommerce.drug_store.model.User;
import com.nikitaovramenko.ecommerce.drug_store.repository.DrugRepository;
import com.nikitaovramenko.ecommerce.drug_store.repository.RatingRepository;
import com.nikitaovramenko.ecommerce.drug_store.repository.UserRepository;

@Service
public class RatingService {
    private RatingRepository ratingRepository;
    private DrugRepository drugRepository;
    private UserRepository userRepository;

    public RatingService(RatingRepository ratingRepository, DrugRepository drugRepository,
            UserRepository userRepository) {
        this.ratingRepository = ratingRepository;
        this.drugRepository = drugRepository;
        this.userRepository = userRepository;
    }

    public void addRating(RatingDto ratingDto) {
        Drug drug = drugRepository.getReferenceById(ratingDto.getDrugId());
        User user = userRepository.getReferenceById(ratingDto.getUserId());
        Integer rate = ratingDto.getRate();

        Rating rating = new Rating();

        rating.setDrug(drug);
        rating.setUser(user);
        rating.setRating(rate);

        drug.getRatings().add(rating);
        user.getRatings().add(rating);

        ratingRepository.save(rating);

    }

}
