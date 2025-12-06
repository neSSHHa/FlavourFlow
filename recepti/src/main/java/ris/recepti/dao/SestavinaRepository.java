package ris.recepti.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import ris.recepti.vao.ingredient;

public interface SestavinaRepository extends JpaRepository<ingredient, Long> {
}
