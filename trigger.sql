CREATE TRIGGER `trg_points_champion` BEFORE UPDATE ON `game`
 FOR EACH ROW BEGIN
    IF EXISTS (SELECT * FROM game WHERE active = 'false' AND idGame = NEW.idGame) THEN
        IF NEW.goalHome > NEW.goalAway THEN
            UPDATE ranking
            SET 
                victory = victory + 1,
                points = points + 3,
                goalsPro = goalsPro + NEW.goalHome, 
                goalsTaken = goalsTaken + NEW.goalAway, 
                goalSum = goalSum - (NEW.goalAway - NEW.goalHome)
            WHERE idTeam = NEW.idTeamHome;

            UPDATE ranking
            SET 
                draw = draw + 1,
                goalsPro = goalsPro + NEW.goalAway, 
                goalsTaken = goalsTaken + NEW.goalHome, 
                goalSum = goalSum - (NEW.goalHome - NEW.goalAway)
            WHERE idTeam = NEW.idTeamAway;
        ELSE
            IF NEW.goalHome = NEW.goalAway THEN
                UPDATE ranking
                SET 
                    points = points + 1,
                    goalsPro = goalsPro + NEW.goalAway,
                    goalsTaken = goalsTaken + NEW.goalHome 
                WHERE idTeam IN (NEW.idTeamHome, NEW.idTeamAway);
            END IF;
        END IF;
    END IF;
END