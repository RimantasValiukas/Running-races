package lt.code.academy.runningracesapi.users.service;

import lt.code.academy.runningracesapi.users.exceptions.UserNotFoundRuntimeException;
import lt.code.academy.runningracesapi.users.dto.User;
import lt.code.academy.runningracesapi.users.entity.UserEntity;
import lt.code.academy.runningracesapi.users.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void saveUser(User user) {
        userRepository.save(UserEntity.convert(user));
    }

    public User getUserById(UUID userId) {
        return userRepository
                .findById(userId)
                .map(User::convert)
                .orElseThrow(() -> new UserNotFoundRuntimeException(userId));
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        UserEntity userEntity = userRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException(String.format("User with username: %s not found", email)));

        return User.convert(userEntity);
    }
}

