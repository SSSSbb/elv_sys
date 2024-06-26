package com.icodeview.rock.security;

import cn.hutool.core.util.StrUtil;
import com.icodeview.rock.exception.UnAuthenticationException;
import com.nimbusds.jose.JOSEException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.lang.NonNullApi;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerExecutionChain;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping;

import javax.annotation.Resource;
import javax.annotation.security.PermitAll;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.text.ParseException;
import java.util.Objects;

@Component
@Slf4j
public class JwtAuthenticationTokenFilter extends OncePerRequestFilter {
    @Resource
    private JwtTokenUtil jwtTokenUtil;
    @Resource
    private RockUserDetailsService rockUserDetailsService;
    @Resource
    private RequestMappingHandlerMapping requestMappingHandlerMapping;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws ServletException, IOException {
        boolean ignoreInvalidToken=false;
        try {
            HandlerExecutionChain executionChain = requestMappingHandlerMapping.getHandler(request);
            HandlerMethod handler = (HandlerMethod) executionChain.getHandler();
            if(handler.hasMethodAnnotation(PermitAll.class)){
                ignoreInvalidToken=true;
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        String jwtToken = request.getHeader(jwtTokenUtil.getHeader());
        if(StrUtil.isNotBlank(jwtToken) && !request.getRequestURI().startsWith("/login")){
            Long userId = null;
            try {
                userId = jwtTokenUtil.getUserIdFromToken(jwtToken);
                if(userId!=null && SecurityContextHolder.getContext().getAuthentication()==null){
                    UserDetails userDetails = rockUserDetailsService.getUserDetailsById(userId);
                    if(jwtTokenUtil.validateToken(jwtToken,userDetails)){
                        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                        SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                    }
                }
            } catch (ParseException | JOSEException e) {
                if(!ignoreInvalidToken){
                    throw new UnAuthenticationException("请登录后继续操作！");
                }
            }
        }
        if(StrUtil.isBlank(jwtToken) && !ignoreInvalidToken){
            throw new UnAuthenticationException("请登录后继续操作！");
        }
        chain.doFilter(request,response);
    }
}
