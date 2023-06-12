package lt.code.academy.runningracesapi.security.filter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lt.code.academy.runningracesapi.security.service.JwtService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import java.io.IOException;

public class JwtAuthorizationFilter extends BasicAuthenticationFilter
{
    private static final String BEARER = "Bearer ";

    private final JwtService jwtService;
    public JwtAuthorizationFilter(AuthenticationManager authenticationManager, JwtService jwtService)
    {
        super(authenticationManager);
        this.jwtService = jwtService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException
    {
        String authorization = request.getHeader("Authorization");

        if(authorization == null || !authorization.startsWith(BEARER)){
            chain.doFilter(request, response);
            return;
        }

        String token = authorization.replace(BEARER, "");
        Authentication authentication = jwtService.parseToken(token);

        SecurityContextHolder.getContext().setAuthentication(authentication);
        chain.doFilter(request, response);
    }
}
