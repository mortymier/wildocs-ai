package com.wildocsai.backend.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter
{
    private final JwtUtil jwtUtil;
    private final UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal
    (HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
    throws ServletException, IOException
    {
        String token = null;
        String header = request.getHeader("Authorization");

        // Check if token exists in the request header
        if(header != null && header.startsWith("Bearer "))
        {
            token = header.substring(7);
        }

        // If not in header, check cookies
        if(token == null)
        {
            Cookie[] cookies = request.getCookies();

            if(cookies != null)
            {
                for(Cookie cookie : cookies)
                {
                    if("jwt".equals(cookie.getName()))
                    {
                        token = cookie.getValue();
                        break;
                    }
                }
            }
        }

        // If still not found, continue filter chain
        if(token == null)
        {
            filterChain.doFilter(request, response);
            return;
        }

        // Once found, validate token
        if(!jwtUtil.validateToken(token))
        {
            filterChain.doFilter(request, response);
            return;
        }

        // Extract email from token
        String email = jwtUtil.getEmailFromToken(token);

        // Authenticate if not already authenticated
        if(email != null && SecurityContextHolder.getContext().getAuthentication() == null)
        {
            UserDetails userDetails = userDetailsService.loadUserByUsername(email);

            if(email.equals(userDetails.getUsername()))
            {
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }

        filterChain.doFilter(request, response);
    }
}
